import Main from "./Main";
import { Route, Switch } from "react-router-dom";
import Administration from "./Administration";
import About from "./About";
import Report from "./Report";
import { Helmet } from "react-helmet";
import Status from "./Status";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/object/:id/report">
          <Report />
        </Route>

        <Route path="/admin/">
          <Administration />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/status">
          <Status />
        </Route>

      </Switch>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Главная</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </div>
  );
}

export default App;
