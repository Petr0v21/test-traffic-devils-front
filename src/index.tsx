import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("app")
);

// ("use strict");

/**
 * user-lms controller
 */

// const { createCoreController } = require("@strapi/strapi").factories;
// const axios = require("axios");
// const { GraphQLClient, gql } = require("graphql-request");

// module.exports = createCoreController("api::user-lms.user-lms", ({ strapi }) => ({
//   async createUser(ctx) {
//     console.log(ctx.request.body);
//     console.log(ctx.request);

//     if (ctx.request.body.Package == "Basic") {
//       ctx.request.body.Package = "Базовый";
//     }
//     if (ctx.request.body.Package == "Vip") {
//       ctx.request.body.Package = "VIP";
//     }
//     if (ctx.request.body.Type_access && ctx.request.body.Type_access !== "Полный") {
//       ctx.request.body.Package += ` (${ctx.request.body.Type_access})`;
//     }

//     const candidateStrapi = await strapi.db.query("api::user-lms.user-lms").findOne({
//       where: { Email: ctx.request.body.Email },
//     });

//     let arrDate = ctx.request.body.Flow_date.split(".");

//     const date1 = new Date(`20${arrDate[2]}-${arrDate[1]}-${arrDate[0]}T00:00:00.000Z`);
//     const date2 = new Date(
//       `20${arrDate[2]}-${arrDate[1]}-${(Number(arrDate[0]) + 1).toString().length === 2 ? Number(arrDate[0]) + 1 : "0" + (Number(arrDate[0]) + 1)}T00:00:00.000Z`
//     );

//     let Flow = await strapi.db.query("api::flow.flow").findMany({
//       select: ["id"],
//       orderBy: { id: "desc" },
//       where: { Stage: "PUBLISHED", label: `Поток ${ctx.request.body.Flow_number}` },
//     });

//     if (Flow.length > 1 || Flow.length === 0) {
//       Flow = await strapi.db.query("api::flow.flow").findMany({
//         select: ["id"],
//         orderBy: { id: "desc" },
//         where: {
//           Stage: "PUBLISHED",
//           poster_date: { $gte: date1, $lt: date2 },
//         },
//       });
//       Flow = Flow[Flow.length - 1];
//     }

//     console.log("Flow: ", Flow);
//     console.log(ctx.request.body.Package);

//     const Package = await strapi.db.query("api::package.package").findOne({
//       where: { Name: ctx.request.body.Package },
//       select: ["id", "Name"],
//     });

//     if (!candidateStrapi) {
//       await strapi.db.query("api::user-lms.user-lms").create({
//         data: {
//           ...ctx.request.body,
//           Flow,
//           Package_Name: Package.Name,
//           Package: Package,
//         },
//       });
//     } else {
//       await strapi.db.query("api::user-lms.user-lms").update({
//         where: { Email: ctx.request.body.Email },
//         data: {
//           ...ctx.request.body,
//           Flow,
//           Package_Name: Package.Name,
//           Package: Package,
//         },
//       });
//     }

//     const candidate = await strapi.service("api::user-lms.user-lms").checkUser(ctx.request.body.Email);

//     if (!candidate.result) {
//       const body = {
//         email: ctx.request.body.Email,
//         phone: ctx.request.body.Phone || "",
//       };

//       const response = await strapi.service("api::user-lms.user-lms").registrationUser(body);
//       response.type = "registration";
//       return response;
//     } else {
//       return { type: "login" };
//     }
//   },

//   async isUserAuthenticated(ctx) {
//     try {
//       const headers = {};
//       headers.cookie = ctx.request.body.cookie;
//       const { data } = await axios.get("https://gerchik.com/api/users/info", { headers: headers }, { withCredentials: true });

//       if (data.authorized) {
//         data.user = data.user.email;
//         return data;
//       }

//       return data;
//     } catch (error) {
//       console.log(error);

//       return false;
//     }
//   },

//   async blocksAccess(ctx) {
//     const { id } = ctx.request.params;

//     const { Flow, user_histories } = await strapi.db.query("api::user-lms.user-lms").findOne({
//       where: { id },
//       populate: ["Flow", "user_histories"],
//     });

//     const graphQLClient = new GraphQLClient("https://api-eu-central-1.hygraph.com/v2/cl6lf38q40mn701uka9oy1b27/master", {
//       headers: {
//         authorization:
//           "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjE3MDQ2ODYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuaHlncmFwaC5jb20vdjIvY2w2bGYzOHE0MG1uNzAxdWthOW95MWIyNy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTRlZGU2ZmEtYmYzMS00MTlmLWE4Y2ItYTgwOTYzNzc1YzA4IiwianRpIjoiY2w3ZGsyZHhmNHlyMDAxdW1ibHY4NnMxNCJ9.XIK8Y7KkXWcFxRBa72DlNEjspJ_z_M8CgbYIHrbKPRdXRoaaj6VVYDndI7Z-fkInQsw9aSH2-Ru6P1SoSkxS2qSB0N1ElsTuhTUXPDddC_H1P_AGS7AxOV-kJhFZHlLN5moSvOBxzeIa4BcnfC1s9ajgpo7e_WEcCJnha5xUQyP0zDdwgc7TN-VufMLYUti91H1mWPWVCRXsSNNcj5qZoEYXstUQay-a9JeD1hUbFAQzn9-YSdlVRgKPxk3nl1pDSr8MTDNUJ0rQYq0yAIWnASrr1_-fVUFWnkJ0Fsc0GtR8OzGgtnqQ8bE11OhjCgE0f-gefLA9bymSkYZdA2F7lpGb_a6NxmcXPZ3rEBM7RsVlY-YCQJEhcYI7iySbsMi_vcAsNsVUZ4MAqWVdJAtTvzb81DXu7yalhXWGItex5J9t2ErQfpgbMTSAINMFEctsVqj6evCXHTOsOc-esH6WlX7yECDuFRicSaBx8mNSX7DbJcdSiGPla7P-_PUVIQk1dfs4p4jfGJcoWkZ5vSDcvAAxMyPDvMiX9LQ_0qtEUAexqKnvONj_plHSkupu0b4enLFzpLueRpEccaj_J9Ih4rfdIpYj1pkbUjp0dyFmOTioV-naDSq0NeWHu_Dof168Es1FK8gO1C_EznamjubnOrUgkkFb-FOY1Jddw-M5nqY",
//       },
//     });
//     const query = gql`
//       query histor($id: ID!) {
//         values: flow(where: { id: $id }, stage: PUBLISHED) {
//           id
//           program {
//             id
//             content(first: 500) {
//               ... on Lesson {
//                 id
//                 lock_condition {
//                   id
//                 }
//                 lesson_test {
//                   id
//                 }
//               }
//             }
//             packages(first: 500) {
//               id
//               slug
//             }
//           }
//         }
//       }
//     `;
//     const variables = {
//       id: Flow.Flow_id,
//     };
//     const graphResp = await graphQLClient.request(query, variables);

//     const blocks = graphResp?.values?.program;
//     if (blocks) {
//       return blocks.map((block, ind) => {
//         // виключення для першого блоку
//         if (ind === 0) {
//           return block.content.map((_) => true);
//         }
//         return block.content.map((lesson) => {
//           if (!lesson.lock_condition) {
//             return true;
//           }

//           const relatedLesson = findRelatedLesson(blocks, lesson.lock_condition.id);

//           let eventType;
//           if (relatedLesson.lesson_test) {
//             eventType = "submitAnswers";
//           } else {
//             eventType = "lessonVideoTotalCovered";
//           }

//           const result = user_histories.find((item) => item.Event_type === eventType && item.Event_object_id === relatedLesson.id);

//           return !!result;
//         });
//       });
//     }
//     return false;
//   },
// }));

// function findRelatedLesson(blocks, relatedLessonId) {
//   let relatedLesson = false;
//   blockFor: for (const block of blocks) {
//     for (const lesson of block.content) {
//       if (lesson.id === relatedLessonId) {
//         relatedLesson = lesson;
//         break blockFor;
//       }
//     }
//   }
//   return relatedLesson;
// }

// /////

// {
//   "kind": "collectionType",
//   "collectionName": "users_lms",
//   "info": {
//     "singularName": "user-lms",
//     "pluralName": "users-lms",
//     "displayName": "User LMS",
//     "description": ""
//   },
//   "options": {
//     "draftAndPublish": false
//   },
//   "pluginOptions": {},
//   "attributes": {
//     "Name": {
//       "type": "string",
//       "required": false
//     },
//     "Email": {
//       "type": "email",
//       "required": false,
//       "unique": false
//     },
//     "Phone": {
//       "type": "string",
//       "required": false,
//       "unique": false
//     },
//     "Package_Name": {
//       "type": "string"
//     },
//     "Product": {
//       "type": "string"
//     },
//     "user_histories": {
//       "type": "relation",
//       "relation": "oneToMany",
//       "target": "api::user-history.user-history",
//       "private": true,
//       "mappedBy": "User"
//     },
//     "Flow": {
//       "type": "relation",
//       "relation": "oneToOne",
//       "target": "api::flow.flow"
//     },
//     "Package": {
//       "type": "relation",
//       "relation": "oneToOne",
//       "target": "api::package.package"
//     },
//     "Freeze_timeline": {
//       "type": "integer",
//       "min": 0
//     },
//     "user_role": {
//       "type": "enumeration",
//       "enum": [
//         "student",
//         "mentor",
//         "admin"
//       ],
//       "default": "student",
//       "enumName": "student"
//     },
//     "certificate": {
//       "type": "relation",
//       "relation": "oneToOne",
//       "target": "api::certificate.certificate",
//       "mappedBy": "user_lm"
//     },
//     "Blocked": {
//       "type": "boolean",
//       "default": false
//     },
//     "Date_blocked": {
//       "type": "datetime"
//     },
//     "notes": {
//       "type": "relation",
//       "relation": "oneToMany",
//       "target": "api::note.note",
//       "mappedBy": "user_lm"
//     },
//     "notifications": {
//       "type": "relation",
//       "relation": "oneToMany",
//       "target": "api::notification.notification",
//       "mappedBy": "user_lm"
//     },
//     "Freeze_from_date": {
//       "type": "date"
//     },
//     "Freeze_limit": {
//       "type": "integer",
//       "min": 0,
//       "max": 2,
//       "default": 0
//     },
//     "Freeze_to_date": {
//       "type": "date"
//     },
//     "Passed_program_blocks": {
//       "type": "json"
//     },
//     "Type_access": {
//       "type": "string"
//     },
//     "Flow_tp": {
//       "type": "relation",
//       "relation": "oneToOne",
//       "target": "api::flow-tp.flow-tp"
//     },
//     "Package_tp": {
//       "type": "relation",
//       "relation": "oneToOne",
//       "target": "api::package-tp.package-tp"
//     },
//     "Package_tp_Name": {
//       "type": "string"
//     }
//   }
// }
