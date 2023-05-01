const request = require("supertest");
import app from "../server";

describe("Testes de usuários", () => {
  it("Deve retornar o status 200 e uma mensagem de sucesso quando o usuário é encontrado", async () => {
    const response = await request(app).get("/users/4SXXFMF");
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Usuário encontrado");
  });

  it("Deve retornar o status 404 e uma mensagem de erro quando o código não é encontrado", async () => {
    const response = await request(app).get("/users/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Código não encontrado" });
  });

  it("Deve retornar o status 200 e uma lista de registros de tempo para o usuário quando o usuário é encontrado", async () => {
    const response = await request(app).get("/users/4SXXFMF/time-records");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Deve retornar o status 404 e uma mensagem de erro quando o usuário não possui registros de tempo", async () => {
    const response = await request(app).get("/users/2/time-records");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Sem registros encontrados" });
  });

  it("Deve retornar o status 400 e uma mensagem de erro quando a ação é inválida", async () => {
    const response = await request(app)
      .post("/users/4SXXFMF/work")
      .send({ action: "invalida" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Ação inválida" });
  });
});

describe("Testes de tempo de trabalho", () => {
  it("Deve retornar o status 200 e um novo registro de tempo quando a ação é 'start'", async () => {
    const response = await request(app)
      .post("/users/4SXXFMF/work")
      .send({ action: "start" });
    expect(response.status).toBe(200);
    expect(response.body.clockIn).not.toBeNull();
    expect(response.body.clockOut).toBeNull();
  });

  it("Deve retornar o status 404 e uma mensagem de erro quando o usuário não é encontrado", async () => {
    const response = await request(app)
      .post("/users/999/work")
      .send({ action: "start" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Código não encontrado" });
  });

  it("Deve retornar o status 200 e o registro de tempo atualizado quando a ação é 'stop'", async () => {
    const response = await request(app)
      .post("/users/4SXXFMF/work")
      .send({ action: "stop" });
    expect(response.status).toBe(200);
    expect(response.body.userId).toBe("1");
    expect(response.body.clockOut).not.toBeNull();
  });

  it("Deve retornar o status 404 e uma mensagem de erro quando não há registros para parar", async () => {
    const response = await request(app)
      .post("/users/4SXXFMF/work")
      .send({ action: "stop" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Nenhum registro encontrado para parar",
    });
  });
});
