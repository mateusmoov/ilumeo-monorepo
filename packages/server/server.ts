import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Rota para validar se o user code existe no banco de dados
app.get("/users/:code/", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { code },
    });

    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404).send("Código não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send("Erro no servidor, tente novamente mais tarde");
  }
});

// Rota para capturar todos os TimeRecord do determinado user code
app.get("/users/:code/time-records", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { code },
      include: { timeRecords: true },
    });

    if (user) {
      res.json(user.timeRecords);
    } else {
      res.sendStatus(404).send("Sem registros encontrados");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send("Erro no servidor, tente novamente mais tarde");
  }
});

// Rota para iniciar e finalizar o ponto de trabalho
app.post("/users/:code/work", async (req: Request, res: Response) => {
  const { code } = req.params;
  const { action } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { code },
    });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    if (action === "start") {
      const timeRecord = await prisma.timeRecord.create({
        data: {
          userId: user.id,
        },
      });

      res.json(timeRecord);
    } else if (action === "stop") {
      const latestTimeRecord = await prisma.timeRecord.findFirst({
        where: {
          userId: user.id,
          clockOut: null,
        },
        orderBy: {
          clockIn: "desc",
        },
      });

      if (latestTimeRecord) {
        const updatedTimeRecord = await prisma.timeRecord.update({
          where: { id: latestTimeRecord.id },
          data: { clockOut: new Date() },
        });

        res.json(updatedTimeRecord);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400).send("Ação inválida");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server is running"));
