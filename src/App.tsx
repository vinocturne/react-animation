import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360,
    },
    leaving: {
        opacity: 0,
        y: 20,
    },
};

function App() {
    // 기본적인 리액트에서 컴포넌트를 보여주고 감추는 것은 아래와 같다
    // 클릭하자마자 showing이 바뀌면서 null이 주어지기 때문에 애니메이션 없이 바로 바뀌게된다.
    // ------------------------------------------------
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing((prev) => !prev);
    // return (
    //     <Wrapper>
    //         {showing ? <Box /> : null}
    //         <button onClick={toggleShowing}>Click</button>
    //     </Wrapper>
    // );
    //-------------------------------------------------
    // <AnimatePresence>는 컴포넌트 표시와 비표시 때 애니메이션을 활성화하는데,
    // AnimatePresence 안에 조건들이 들어가게 된다.
    // AnimatePresence는 애니메이션이 적용되는 판을 깔아주는 것이고
    // 애니메이션 자체는 해당 컴포넌트에 적용해주면 제대로 적용된다.
    // exit 속성을 가지고 사라질때 애니메이션을 지정할 수 있다.
    return (
        <Wrapper>
            <AnimatePresence>
                {showing ? (
                    <Box
                        variants={boxVariants}
                        initial="initial"
                        animate="visible"
                        exit="leaving"
                    />
                ) : null}
            </AnimatePresence>
            <button onClick={toggleShowing}>Click</button>
        </Wrapper>
    );
}

export default App;
