const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const app = require("../server").app;
require("dotenv").config();
const bcrypt = require("bcryptjs");

describe("POST /lregister", () => {
  test("With correct body", async () => {
    const res = await request(app).post("/lregister").send({
      name: "Lambu Rekha",
      email: "rekha@gmail.com",
      password: "12345",
      bought: [],
      progress: [],
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /lregister", () => {
  test("With incorrect body", async () => {
    const res = await request(app).post("/lregister").send({
      email: "lambuyashaswi",
    });
    expect(res.statusCode).toBe(500);
  });
});

describe("POST /lregister", () => {
  test("With already existing user", async () => {
    const res = await request(app).post("/lregister").send({
      name: "Lambu Rekha",
      email: "rekha@gmail.com",
      password: "12345",
      bought: [],
      progress: [],
    });
    expect(res.statusCode).toBe(500);
  });
});

module.exports = { app };
