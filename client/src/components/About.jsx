import React from "react";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Preloader from './Preloader';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  text: {
    width: 700,
    textAlign: "center",
    margin: "auto",
  },
  container: {
    marginTop: 30,
    marginLeft: 200,
  },
  tableCont: {
    marginTop: "20px",
    textAlign: "center",
  },
}));

function About() {
  const loading = useSelector((state) => state.objects.loading);

  const classes = useStyles();

  if (loading) {
    return (
      <Preloader/>
    );
  }

  return (
    <div>
      <Paper elevation={3} className={classes.tableCont} component={Paper}>
        <Typography className={classes.text} >
          Компания ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ИнтоСтрой"
          зарегистрирована 26.01.2022 г. в городе Грозный. Краткое наименование:
          ИнтоСтрой. При регистрации организации присвоен ОГРН 10216064442952,
          ИНН 1444400006 и КПП 10000001. Юридический адрес: РЕСПУБЛИКА ЧЕЧНЯ
          РАЙОН Грозный ГОРОД АРСК УЛИЦА ЗАРЕЧНАЯ 13. Кудузов Ахмед является
          генеральным директором организации. Учредители компании — Муталиев
          Абубакр Магомедович, Ажигов Адам, Муталиев Магомед Хусейнович.
          Среднесписочная численность (ССЧ) работников организации — 1. В
          соответствии с данными ЕГРЮЛ, основной вид деятельности компании
          ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ИнтоСтрой" по ОКВЭД: 41.2
          Строительство жилых и нежилых зданий. Общее количество направлений
          деятельности — 9. За 2018 год прибыль компании составляет — 89 000 ₽,
          выручка за 2018 год — 2 222 000 ₽. Размер уставного капитала ОБЩЕСТВО
          С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ИнтоСтрой" — 10 050 ₽. Выручка на
          начало 2018 года составила 4 853 000 ₽, на конец — 2 222 000 ₽.
          Себестоимость продаж за 2018 год — 2 111 000 ₽. Валовая прибыль на
          конец 2018 года — 111 000 ₽. Общая сумма поступлений от текущих
          операций на 2018 год — 2 222 000 ₽. На 05 июля 2021 организация
          действует. Юридический адрес ИнтоСтрой, выписка ЕГРЮЛ, аналитические
          данные и бухгалтерская отчетность организации доступны в системе.
        </Typography>
      </Paper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>О нас</title>
        <link rel="canonical" href="/home" />
      </Helmet>
    </div>
  );
}

export default About;
