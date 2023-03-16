import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";
import timeElapsed from "~/future/timeElapsed";

import Button from "~/components/Button";
import style from "./Questions.module.scss";
import * as questionServices from "~/services/questionServices";

const cx = classNames.bind(style);

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [sortActive, setSortActive] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      const result = await questionServices.getQuestionsSortNew();
      setQuestions(result);
    };
    getQuestion();
  }, []);

  const handleSortVote = () => {
    setSortActive(!sortActive);
    const getQuestion = async () => {
      const result = await questionServices.getQuestionsSortVote();
      setQuestions(result);
    };
    getQuestion();
  };

  const handleSortNew = () => {
    setSortActive(!sortActive);
    const getQuestion = async () => {
      const result = await questionServices.getQuestionsSortNew();
      setQuestions(result);
    };
    getQuestion();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-nav")}>
        <h1>Top Questions</h1>
        <div className={cx("sort")}>
          {sortActive ? (
            <Button primary small nmw>
              New
            </Button>
          ) : (
            <Button outline small nmw onClick={handleSortNew}>
              New
            </Button>
          )}
          {sortActive ? (
            <Button outline small nmw onClick={handleSortVote}>
              Vote
            </Button>
          ) : (
            <Button primary small nmw>
              Vote
            </Button>
          )}
        </div>
      </div>
      <div className={cx("container")}>
        {questions.map((question) => {
          let tags = JSON.parse(question.tags[0]);

          let questionTime = timeElapsed(question.createdAt);

          return (
            <div key={question._id} className={cx("item")}>
              <div className={cx("header")}>
                <Link
                  className={cx("user")}
                  to={`/profile/${question.user._id}`}
                >
                  <div className={cx("avata")}>
                    <img
                      src={question.user.avatar}
                      alt={question.user.username}
                    />
                  </div>
                  <div className={cx("username")}>{question.user.username}</div>
                  <Tippy content="Điểm hoạt động">
                    <div className={cx("score")}>
                      {question.user.reputationScore}
                    </div>
                  </Tippy>
                </Link>

                <div className={cx("info")}>
                  <span>
                    {question.upvote.length - question.downvote.length} vote
                  </span>
                  <span>0 answers</span>
                  <span>{question.viewed} views</span>
                  <span>asked {questionTime}</span>
                  {question.solved ? (
                    <span className={cx("solved")}>Solved</span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={cx("title")}>
                <Link to={`/question/${question._id}`} className={cx("link")}>
                  {question.title}
                </Link>
              </div>
              <div className={cx("tags")}>
                {tags.map((tag, index) => (
                  <Button key={index} text small className={cx("tag")}>
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
