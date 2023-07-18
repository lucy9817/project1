import express, { Request, Response } from 'express';

//exprss 앱 설정
const app = express();

//포트 지정
const port = 3000;


app.use(express.json());

//라우팅 설정
app.get('/', (req: Request, res: Response) => {
  res: 'Main page';
});

//서버 시작
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
