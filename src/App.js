import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function Header(props) {
  console.log(props, props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
} //component 라고 부름
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol> {/* jsp,thymeleaf의 foreach와 비슷*/}
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Create(props) {
  // create함수는 Create 태그의 onCreate 함수를 props로 받는다.
  return (
    <article>
      <h2>Create</h2>
      {/* onsubmit은 form태그의 submit버튼을 클릭했을때 발생하는 이벤트 | form태그는 submit했을때 페이지가 리로드됨*/}
      <form
        action="#"
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          // event.target.title 까지는 태그를 의미 , 값을 가져올려면 value도 작성
          const body = event.target.body.value;
          props.onCreate(title, body);
          // Create 태그의 props인 onCreate 함수를 실행하여 클라이언트(사용자)에게 받은 title과 body를 공급할 수 있다. /   사용자가 입력한 title,body를 Create component에게 공급할 수 있다.
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}
function App() {
  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  //3까지는 만들었기때문에 그다음에 바로 적용할 수 있도록 4로 시작
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is...." },
    { id: 2, title: "css", body: "css is...." },
    { id: 3, title: "js", body: "js is...." },
  ]);
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
        }}
      ></Create>
    );
  }
  return (
    <div className="App">
      {/*  component 라고 부름 속성을 prop이라고 부름 */}
      <Header
        title="REACT"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        create
      </a>
    </div>
  );
}

export default App;
