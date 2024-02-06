import { useState, useEffect, useRef } from 'react'
import parse from 'html-react-parser';
import './App.scss';
import { usersData, quizessData } from './data'

function App() {

  interface Modal {
    title?: string
    content?: any
    mode?: string
    quiz?: Quiz
    modalActive: boolean
  }

  interface ModalComponentProps {
    modal: Modal
    quiz?: Quiz
    showAnswer?: boolean
    showScore?: boolean
    random?: number[]
    users: Array<User>
    userSelected?: number
    scoreSelected?: number
    // onSelectScore?: (val : number) => void
  }

  interface Users {
    users: Array<User>
    showScore?: boolean
    userSelected?: number
    scoreSelected?: number
    // onSelectScore?: (val : number) => void
  }

  interface User {
    id?: number
    name?: string
    score?: number
  }

  interface Quizess {
    quizess: Array<Quiz>
  }

  interface ResultComponentProps {
    quizess: Array<Quiz>
    users: Array<User>
  }

  interface Quiz {
    id: number
    image: string
    question: string
    answer: string
    hint?: string[],
    completed: boolean
  }

  interface RandomText {
    text?: string
    showAnswer?: boolean,
    random?: number[];
  }

  let intervalRef : any = useRef();
  let scoreRef : any = useRef();

  const [ modal, setModal ] = useState<Modal>({
    title : 'Welcome to the Game',
    content : '<p className="welcome-img"><img src="https://www.magnolia-cms.com/.imaging/mte/corpweb2021/450/dam/partners/partner-logos/abc/logo-crescendo-collective-2017-12-08.jpg/jcr:content/logo-crescendo-collective-2017-12-08.jpg"></p>',
    mode : 'entrance',
    modalActive : true
  });
  const [ users, setUsers ] = useState<Array<User>>(usersData);
  const [ quizess, setQuizess ] = useState<Array<Quiz>>(quizessData);
  const [ quiz, setQuiz ] = useState<Quiz>();
  const [ showAnswer, setShowAnswer ] = useState<boolean>(false);
  const [ showScore, setShowScore ] = useState<boolean>(false);
  const [ userSelected, setUserSelected ] = useState<number>(0);
  const [ scoreSelected, setScoreSelected ] = useState<number>(0);
  const [ random, setRandom ] = useState<Array<number>>([0,3,6,8]);


  useEffect(() => {
    sessionStorage.setItem("test"+ Math.random(), JSON.stringify(users));
  }, [])

  const handleModalIsActive = ( isActive : boolean ) => {
    setModal({
      title : '',
      content : '',
      mode : '',
      modalActive : isActive
    });
    if(!isActive)
      setShowAnswer(false);
      setUserSelected(0);
      clearInterval(intervalRef.current);
  }

  const handleAddUsers = ( e : any ) => {
    e.preventDefault;
    const name = e.target[0].value;
    if( name )
      setUsers((prevState) => [
        ...prevState,
        { id: users.length + 1,
          name: name,
          score: 0 
        }
      ])
  }

  const handleRemoveUser = ( id: number | undefined ) => {
    if(confirm('You want to remove this user?')) {
      const new_users = users.filter(item => item.id !== id);
      setUsers(new_users);
    }
  }

  const handleTakeQuiz = ( item : Quiz ) => {
    setModal({
      title : item.question,
      content : '',
      mode : 'quiz',
      modalActive : true
    });
    setQuiz(item);
    const id = setInterval(() => {
      const max = (item.answer) ? item.answer.length - 1 : 10;
      const min = 0;
      let rand = Math.floor(Math.random() * (max - min + 1)) + min;
      if(random.includes(rand))
        rand = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandom((prevState) =>  [...prevState, rand])
    }, 2000);
    intervalRef.current = id;
  }

  const handleShowAnswer = ( showAnswer : boolean ) => {
    setShowAnswer(showAnswer);
    clearInterval(intervalRef.current);
  }

  const handleShowScore = (  e : any, showScore : boolean ) => {
    e.preventDefault();
    if(userSelected) {
      setShowAnswer(true);
      setShowScore(showScore);
      clearInterval(intervalRef.current);
    } else {
      alert('No user selected!');
    }
  }

  const handleChangeUser = ( e : any ) => {
    e.preventDefault();
    setUserSelected(e.target.value);
  }

  const handleSelectScore = ( score: number | undefined ) => {
    scoreRef.current = score;
  }

  const handleCalculateUserScore = ( e : any ) => {
    e.preventDefault();
    console.log('gg', scoreRef.current);
    if(!scoreRef.current) {
      alert('No bonus is selected!');
    } else {
      const userIndex = userSelected - 1;
      let usersNewArray = [...users];
      usersNewArray[userIndex] = {...usersNewArray[userIndex], score: usersNewArray[userIndex].score + scoreRef.current }
      setUsers(usersNewArray);

      const quizIndex = quizess.findIndex((item:any) => item.id === quiz?.id);
      let quizNewArray = [...quizess];
      quizNewArray[quizIndex] = {...quizNewArray[quizIndex], completed: true }
      setQuizess(quizNewArray);

      setModal({
        title : '',
        content : '',
        mode : '',
        modalActive : false
      });
      setUserSelected(0);
      setScoreSelected(0);
      setShowScore(false);
      setShowAnswer(false);
      setRandom([1,3,6,8]);
      setQuiz({
          id: 0,
          question: '',
          answer: '',
          image: '',
          hint: [],
          completed: false
      });
      scoreRef.current = 0; 
    }
  }

  const RandomHTMLRenderComponent = ( { text , showAnswer, random } : RandomText ) : JSX.Element => (
    <div id="quiz-choices">
      <div>
        {
          (text) ?
              text?.split('').map((i:string, index: number) => {
                let classN = ''
                if( i === ' ' ) classN += 'space'
                if( showAnswer || random?.includes(index) ) classN += 'show' 
                return (
                  <span key={index} 
                  className={classN}>{ i }</span>
                )
              })
          : ''
        }
      </div>
      <button className="btn  btn-small" onClick={ () => handleShowAnswer(true) }>Show</button>
    </div>
  )

  const ModalComponent = ( { modal, quiz, showAnswer, random, users, showScore, userSelected } : ModalComponentProps ) : JSX.Element => {
    // const handleOnSelectScore = (score : number) => {
    //   onSelectScore?.(score)
    // }
    return (
      <div id="modal-area" className={ modal.modalActive ? 'active' : '' }>
        <div className="modal-container">
          { (modal.mode !== 'entrance') ?
          <a href="#" className="close-button" onClick={ () => handleModalIsActive(false)} >Close</a>
          : '' }
          <h2>{ modal.title }</h2>
          <div className="modal-body">
            { parse(modal.content) }
            {
            (modal.mode === 'quiz' || quiz) ?
              <div id="quiz-area">
                <div  className="clearfix">
                  <div id="quiz-image">
                    <a href={ quiz?.image } target="_blank"><img src={ quiz?.image } /></a>
                  </div>
                  { (quiz?.hint) ?
                  <div id="quiz-tips">
                    <h2>Hint</h2>
                    <ul>
                      {
                        quiz.hint.map((item: any, index: number) => {
                          return (
                            <li key={index}>{item}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  : '' }
                </div>
                <RandomHTMLRenderComponent text={quiz?.answer} showAnswer={showAnswer} random={random} /> 
                <UserListsComponent users={users} showScore={showScore} userSelected={userSelected} />
              </div>
            : '' }

          </div>
          { (modal.mode === 'entrance') ?
          <a href="#" className="start-button btn" onClick={ () => handleModalIsActive(false)} >Start</a>
          : '' }
        </div>
      </div>
    )
  }

  const SideBarUsersComponent = ( props : Users ) : JSX.Element => (
    <div id="sidebar-area">
      <AddUserComponent />
      { 
        (props.users?.length) ?
          <div id="user-area">
            <h2>Players</h2>
            {
               props.users.map((item) => {
                return (
                  <UserItemComponent name={item.name} score={item.score} id={item.id} key={item.id}/>
                )
              })
            }
          </div>     
      : '' }
    </div>
  )

  const UserItemComponent = ( props: User ) : JSX.Element => (
    <div className="user-item clearfix">
        <p className="name">{props.name}</p>
        <p className="score">{props.score} <a href="#" onClick={() => handleRemoveUser(props.id)}>x</a></p>
    </div>
  )

  const AddUserComponent = () : JSX.Element => (
    <form onSubmit={(e) => handleAddUsers(e) }>
      <input type="text" />
      <button type="submit" className="btn">Add Player</button>
    </form>
  )

  const MainQuizessComponent = ( props: ResultComponentProps ) : JSX.Element => {
    let completedAll = props.quizess?.every(item => item.completed);
    let top = props.users;
    let arrangetop : any = [];
    if (completedAll) {
      top = props.users?.sort((a:any, b:any) => b.score - a.score)?.slice(0,3);
      arrangetop = [ top[1], top[0], top[2]];
      window.scrollTo(0,0);
    }

    return (
      <div id="main-area">
      { 
        (completedAll) ? 
          <div id="quiz-completed">
            <h2>Quizess are completed! Results:</h2>
            <div id="congrats">
              <img src="https://i.gifer.com/yxM.gif"/>
            </div>
            <div className="clearfix">
              {
                arrangetop.map((user:any, index: number) => {
                  return (
                    <div className="winners" key={user.id}>
                      <p className="top">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkTnq4Cc_KOgfrZEz2fZrymkp_7QpMgwTRQ&usqp=CAU" />
                      </p>
                      <p className="score">{ user.score }</p>
                      <p className="name">{ user.name }</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        : ''
      }
      {
        (props.quizess?.length) ?
          <div id="quizess-area" className="clearfix">
            <h2>Crescendo Faces</h2>
            {
               props.quizess.map((quiz:any) => {
                return (
                  <div className={"quiz-item " + (quiz.completed ? 'completed' : '') } key={quiz.id} onClick={() => {
                    (!quiz.completed) ?
                      handleTakeQuiz(quiz)
                    : ''
                    } 
                  }>
                    <span>{quiz.id}</span>
                    <img src={quiz.image}/>
                  </div>
                )
              })
            }
          </div>     
        : 'No quizess found!' 
      }
      </div>
    )
  }

  const UserListsComponent = ( { users, showScore, userSelected }: Users ) : JSX.Element => {
    const userlists = users;
    const score : number[] = [10,20,30];
    let shuffled = score.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
    // const handleSelectScore = ( e : any ) => {
    //   onSelectScore?.(e.target.value)
    // }
    return (
      <div>
        {
        (userlists.length) ?
          <form id="form-score-user" onSubmit={(event) => handleCalculateUserScore(event) }>
            <select name="user" 
              onChange={(event) => handleChangeUser(event) }
              value={userSelected}
            >
              <option disabled value="0">- Select -</option>
            {
              userlists.map((item : any) => {
                return (
                  <option value={item.id} key={item.id}>{ item.name }</option>
                )
              })
            }
            </select>
            <a href="#" className="btn btn-small" onClick={(event) => handleShowScore(event, true) }>Score</a>
            <div id="random-score" className={(showScore) ? 'active' : ''}>
              <div className="score-container">
                <div>
                {
                  shuffled.map((item: number) => {
                    return (
                      <div className="score-item" key={item}>
                        <input type="radio" value={item} name="score" 
                          onChange={() => handleSelectScore(item)} 
                        />
                        <label>{ item }</label>
                      </div>
                    )
                  })
                }
                </div>
                <button type="submit" className="btn btn-small">Submit</button>
              </div>
            </div>
          </form>
        : '' }
      </div>
    )
  }

  return (
    <div className="App">
        <ModalComponent modal={modal} quiz={quiz} showAnswer={showAnswer} random={random} users={users} showScore={showScore} userSelected={userSelected} 
        // onSelectScore={handleSelectScore} 
        />
        <SideBarUsersComponent users={users} />
        <MainQuizessComponent quizess={quizess} users={users} />
    </div>
  )
}

export default App
