import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function sendSuccess(res: Response, data: any) {
  res.status(200).json(data);
}

function sendError(res: Response, code: number, message: string) {
  res.status(code).json({ error: message });
}

app.get("/users/:code/", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        code,
      },
    });

    if (user) {
      sendSuccess(res, "Usuário encontrado");
    } else {
      sendError(res, 404, "Código não encontrado");
    }
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Erro no servidor, tente novamente mais tarde");
  }
});

app.get("/users/:code/time-records", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { code },
      include: { timeRecords: true },
    });

    if (user) {
      sendSuccess(res, user.timeRecords);
    } else {
      sendError(res, 404, "Sem registros encontrados");
    }
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Erro no servidor, tente novamente mais tarde");
  }
});

app.post("/users/:code/work", async (req: Request, res: Response) => {
  const { code } = req.params;
  const { action } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { code },
    });

    if (!user) {
      sendError(res, 404, "Código não encontrado");
      return;
    }

    if (action === "start") {
      const timeRecord = await prisma.timeRecord.create({
        data: {
          userId: user.id,
        },
      });

      sendSuccess(res, timeRecord);
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

        sendSuccess(res, updatedTimeRecord);
      } else {
        sendError(res, 404, "Nenhum registro encontrado para parar");
      }
    } else {
      sendError(res, 400, "Ação inválida");
    }
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Erro no servidor, tente novamente mais tarde");
  }
});

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
