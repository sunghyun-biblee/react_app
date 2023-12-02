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
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  // 출력을 위해 title 값을 가져오고, 변경된 값을 보내주기, 2가지 기능을 사용하기위해 usestate를 사용
  return (
    <article>
      <h2>Update</h2>
      <form
        action="#"
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        {/* html에서는 onchange가 값을 보낼때 작동되지만 
        리액트에서는 값이 변경되는 작동된다. */}
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update" />
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
  const [nextId, setNextId] = useState(1);
  //3까지는 만들었기때문에 그다음에 바로 적용할 수 있도록 4로 시작
  const [topics, setTopics] = useState([]);
  let content = null;
  let newlist = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
    newlist = (
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        create
      </a>
    );
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
    newlist = (
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        create
      </a>
    );
    contextControl = (
      <>
        <a
          href={"/update/" + id}
          onClick={(event) => {
            event.preventDefault();
            setMode("UPDATE");
          }}
        >
          Update
        </a>

        <input
          type="button"
          value="Delete"
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < topics.length; i++) {
              if (topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
              //(topics[i] !== id)에서 id값은 Nav 리스트의 내가 원하는 게시물을 클릭할때 해당 게시물의 read페이지로 이동하면서 게시물의 id 값을 setId 해주기 때문에 usestate의 id값은 해당 게시물의 id값으로 바뀌어져있다. 그래서 id 값을 불러오면 해당 게시물의 id 값을 가져 올 수있다.
              //추가된 리스트또한 Create 함수에서 setnexid로 값을 +1 되도록 지정해주었기때문에 게시물의 id값을 서로 다 다르다.

              // 자세한것은 app함수의 Nav태그의 내부를 확인해봐라
            }
            setTopics(newTopics);
            // setMode("WELCOME");
          }}
        />
      </>
      // 리액트에서는 변수에 태그를 저장할떄는 하나의 태그 안에 들어있어야한다
      // <></> : 복수의 태그를 그룹핑하는 용도라고 생각
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          // 값 복제 (...)<<을 앞에 붙임
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          // react는 component의 값이 변경될때 리로드 되는데
          // 원시타입(primitive)인 string,number,boolean,...은 값을 변경하기때문에 react에서 값이 변경된것으로 인식하고 리로드됨
          // 하지만 번타입 (object나 Array)일 경우 값이 변경된 것이 아닌 추가 된것이기 때문에 set 할 경우에는 새로운 변수를 생성하여 기존값을 복제한 후 , 복제한 변수에 내가 추가하고싶은 데이터를 넣은 뒤에 set을 해주어야 한다. 그래야 react에서는 값이 변경된것으로 인식하고 리로드함.

          // 처음실행될때 nextId는 nextid usestate를 설정할때 기존게시물id (3개가 있는상태) 값에 +1 (3+1) 해준값이기때문에 신경쓰지 않아도 된다.

          setId(nextId); // setid를 하지않아도 create를 누르게되면 리스트의 번호는 증가한다, 단 id값은 nexid값으로 고정되어있기때문에 리스트에 추가될시 해당 li태그의 id를 현태 nextid 값으로 설정

          setNextId(nextId + 1); // 다음 추가되는 객체도 +1하여 id값을 저장할 수 있도록 미리 setnexid+1을 하여 id값이 중복되지않도록 증가시켜 준다.
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const newTopics = [...topics];
          const updateTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id == id) {
              newTopics[i] = updateTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
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
      {newlist}
      {contextControl}
    </div>
  );
}

export default App;
