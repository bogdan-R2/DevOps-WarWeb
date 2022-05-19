import React, { useContext } from "react";
import { database } from "../firebase";

const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}

export function FetchProvider({ children }) {
  async function digestText(text) {
    const msgUint8 = new TextEncoder().encode(text); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }

  async function fetchUserType(currentUser) {
    let userType = {
      student: false,
      professor: false,
      admin: false,
    };

    if (!currentUser) {
      return userType;
    }

    const key = await digestText(currentUser.email);

    const dbStudentRef = database.ref(`/Student/${key}`);
    const dbProfessorRef = database.ref(`/Professor/${key}`);
    const dbAdminRef = database.ref(`/Admin/${key}`);

    // Check if it's a student
    await dbStudentRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userType.student = true;
      }
    });

    // Check if it's a professor
    await dbProfessorRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userType.professor = true;
      }
    });

    // Check if it's an admin
    await dbAdminRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userType.admin = true;
      }
    });

    return userType;
  }

  async function fetchUserData(currentUser) {
    let userData = {};

    if (!currentUser) {
      return userData;
    }

    const key = await digestText(currentUser.email);
    const dbStudentRef = database.ref(`/Student/${key}`);
    const dbProfessorRef = database.ref(`/Professor/${key}`);
    const dbAdminRef = database.ref(`/Admin/${key}`);

    // Check if it's a student
    await dbStudentRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userData = snapshot.val();
      }
    });

    // Check if it's a professor
    await dbProfessorRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userData = snapshot.val();
      }
    });

    // Check if it's an admin
    await dbAdminRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        userData = snapshot.val();
      }
    });

    return userData;
  }

  async function fetchCoursesKeys() {
    let coursesKeys = [];

    const coursesRef = database.ref("/Course");

    await coursesRef.once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        coursesKeys.push(child.key);
      });
    });

    return coursesKeys;
  }

  async function fetchCourseData(courseKey) {
    var courseData = {};
    const courseRef = database.ref(`/Course/${courseKey}`);

    await courseRef.once("value", function (snapshot) {
      courseData = snapshot.val();
    });

    return courseData;
  }

  // async function fetchAttendanceCourse(courseKey, day) {
  //   var attendanceList = [];
  //   var dayList = [];
  //   var timestamp = "";
  //   var emailStudent = "";

  //   const dbAttendanceCourseRef = database
  //     .ref()
  //     .child(`Attendance/${courseKey}/${day}`);

  //   await dbAttendanceCourseRef.once("value", function (snapshotTimestamp) {
  //           snapshotTimestamp.forEach(function (childTimestamp) {
  //             timestamp = childTimestamp.key;

  //             dbAttendanceCourseRef
  //               .child(`${timestamp}/`)
  //               .once("value", function (snapshotEmail) {
  //                 snapshotEmail.forEach(function (childEmail) {
  //                   emailStudent = childEmail.val();

  //                   console.log("IN FETCH CONTEXT, DAY: " + day);

  //                   const userData = {
  //                     Course: courseKey,
  //                     Day: day,
  //                     "QR Code Timestamp": timestamp,
  //                     "Student Email": emailStudent,
  //                   };

  //                   attendanceList.push(userData);
  //                 });
  //               });
  //           });
  //         });

  //   return attendanceList;
  // }

  async function fetchAttendanceCoursePerDay(courseKey, day) {
    var attendanceList = [];
    var timestamp = "";
    var emailStudent = "";

    const dbAttendanceCourseDayRef = database
      .ref()
      .child(`Attendance`)
      .child(`${courseKey}`)
      .child(`${day}`);

    console.log(courseKey);
    console.log(day);

    var promises = [];

    promises.push(
      await dbAttendanceCourseDayRef.once(
        "value",
        function (snapshotTimestamp) {
          snapshotTimestamp.forEach(function (childTimestamp) {
            timestamp = childTimestamp.key;
            console.log("timestamp: " + timestamp);

            dbAttendanceCourseDayRef
              .child(`${timestamp}/`)
              .once("value", function (snapshotEmail) {
                snapshotEmail.forEach(function (childEmail) {
                  emailStudent = childEmail.val();

                  const userData = {
                    Course: courseKey,
                    Day: day,
                    "QR Code Timestamp": timestamp,
                    "Student Email": emailStudent,
                  };

                  return userData;
                });
              });
          });
        }
      )
    );
  }

  async function fetchAttendanceCourseDays(courseKey) {
    var dayList = [];
    var day = "";

    const dbAttendanceCourseRef = database
      .ref()
      .child(`Attendance/${courseKey}/`);

    await dbAttendanceCourseRef.once("value", function (snapshotDay) {
      snapshotDay.forEach(function (childDay) {
        day = childDay.key;
        dayList.push(day);
      });
    });

    console.log(dayList);
    return dayList;
  }

  async function fetchAttendanceCourse(courseKey) {
    var attendanceList = [];
    var dayList = [];
    var day = "";
    var timestamp = "";
    var emailStudent = "";

    const dbAttendanceCourseRef = database
      .ref()
      .child(`Attendance/${courseKey}/`);

    await dbAttendanceCourseRef
      .once("value", async function (snapshotDay) {
        snapshotDay.forEach(async function (childDay) {
          day = childDay.key;
          var timestampList = [];

          await dbAttendanceCourseRef
            .child(`${day}/`)
            .once("value", async function (snapshotTimestamp) {
              snapshotTimestamp.forEach(async function (childTimestamp) {
                timestamp = childTimestamp.key;
                var userDataList = [];

                await dbAttendanceCourseRef
                  .child(`${day}/${timestamp}/`)
                  .once("value", async function (snapshotEmail) {
                    snapshotEmail.forEach(async function (childEmail) {
                      // console.log(childEmail.val());
                      return childEmail.val();
                    });
                  })
                  .then((userData) => {
                    return userDataList.push(userData);
                  });

                return { timestamp: userDataList };
              });
            })
            .then((timestampWemail) => {
              return timestampList.push(timestampWemail);
            });

          return { day: timestampList };
        });
      })
      .then((dayWtimestamp) => {
        return dayList.push(dayWtimestamp);
      });

    var dayListJson = JSON.parse(JSON.stringify(dayList));
    for (let i in dayListJson) {
      for (let day in dayListJson[i]) {
        for (let timestamp in dayListJson[i][day]) {
          attendanceList.push({
            Course: courseKey,
            Day: day,
            Timestamp: timestamp,
            "Email": dayListJson[i][day][timestamp].email,
						"Username": dayListJson[i][day][timestamp].username,
						"First Name": dayListJson[i][day][timestamp].firstName,
						"Last Name": dayListJson[i][day][timestamp].lastName,
						"Year": dayListJson[i][day][timestamp].year,
						"Group": dayListJson[i][day][timestamp].group
          });
        }
      }
    }

    return attendanceList;
  }

  async function fetchAttendanceAll() {
    var attendanceList = [];
    var courseKey = "";
    var day = "";
    var timestamp = "";
    var emailStudent = "";

    const dbAttendanceRef = database.ref().child("Attendance/");

    await dbAttendanceRef.once("value", function (snapshot1) {
      snapshot1.forEach(function (child1) {
        courseKey = child1.key;

        dbAttendanceRef
          .child(`${courseKey}/`)
          .once("value", function (snapshot2) {
            snapshot2.forEach(function (child2) {
              day = child2.key;

              dbAttendanceRef
                .child(`${courseKey}/${day}/`)
                .once("value", function (snapshot3) {
                  snapshot3.forEach(function (child3) {
                    timestamp = child3.key;

                    dbAttendanceRef
                      .child(`${courseKey}/${day}/${timestamp}/`)
                      .once("value", function (snapshot4) {
                        snapshot4.forEach(function (child4) {
                          emailStudent = child4.val();

                          const userData = {
                            Course: courseKey,
                            Day: day,
                            "QR Code Timestamp": timestamp,
                            "Student Email": emailStudent,
                          };

                          attendanceList.push(userData);
                        });
                      });
                  });
                });
            });
          });
      });
    });

    return attendanceList;
  }

  const value = {
    fetchUserType,
    fetchUserData,
    fetchCoursesKeys,
    fetchCourseData,
    fetchAttendanceAll,
    fetchAttendanceCourse,
    fetchAttendanceCourseDays,
    fetchAttendanceCoursePerDay,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
