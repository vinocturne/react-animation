import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Box = styled(motion.div)`
    display: flex;
    position: absolute;
    top: 100px;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
    //return을 해야하기 때문에 직접 {return}을 사용하거나
    //혹은 {}를 ()로 감싸주면 된다.
    entry: (isBack: boolean) => ({
        x: isBack ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: (isBack: boolean) => ({
        x: isBack ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.3,
        },
    }),
};

function App() {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const next = () => {
        setBack(false);
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    };
    const prev = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    };
    return (
        <Wrapper>
            {/* custom은 해당 컴포넌트와 AnimatePresence 모두 넣어주어야 한다. */}
            {/* exitBeforeEnter 속성을 사용하여 한 애니메이션이 완전히 끝난 뒤에 다음 애니메이션을 동작시킬 수도 있다. */}
            <AnimatePresence custom={back}>
                {/* 기본적으로는 아래와 같이 설정하는 것이 일반적이나, 이렇게 되면 한 개의 박스와 9개의 null을 생성하고
                  key가 바뀔 때마다 새로운 값으로 이를 바꿔주게 된다.  */}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
                    i === visible ? (
                        <Box
                            key={i}
                            variants={boxVariants}
                            initial="entry"
                            animate="center"
                            exit="exit"
                        >
                            {i}
                        </Box>
                   ) : null
                 )} */}
                {/* 이는 아래와 같이 수정 가능하다.
                    key값이 바뀌면 리액트는 새로운 컴포넌트를 랜더링한다.*/}
                <Box
                    custom={back}
                    key={visible}
                    variants={boxVariants}
                    initial="entry"
                    animate="center"
                    exit="exit"
                >
                    {visible}
                </Box>
                {/* custom은 variants에 데이터를 보낼 수 있게 해주는 property */}
            </AnimatePresence>
            <button onClick={next}>next</button>
            <button onClick={prev}>prev</button>
        </Wrapper>
    );
}

export default App;
