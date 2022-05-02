import styled from "styled-components";
import { motion } from "framer-motion";
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
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: #00a5ff;
    height: 100px;
    width: 100px;
    border-radius: 50px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={toggleClicked}>
            <Box>
                {/* layoutId를 사용하여 두 개의 컴포넌트는 모션을 이어서 공유한다는 것을 확인시킨다
                  서로 떨어져 있는 컴포넌트라도 내부의 요소들이 서로 이어져서 애니메이션이 실행된다. */}
                {!clicked ? (
                    <Circle
                        layoutId="circle"
                        style={{ borderRadius: 50, scale: 1.5 }}
                    />
                ) : null}
            </Box>
            <Box>
                {clicked ? (
                    <Circle
                        layoutId="circle"
                        style={{ borderRadius: 0, scale: 0.5 }}
                    />
                ) : null}
            </Box>
        </Wrapper>
        // <Wrapper onClick={toggleClicked}>
        //     <Box
        //         style={{
        //             justifyContent: clicked ? "center" : "flex-start",
        //             alignItems: clicked ? "center" : "flex-start",
        //         }}
        //     >
        //         {/* layout 기능으로 변경되는 css에 자동적으로 애니메이션을 넣어줄 수 있다. */}
        //         <Circle layout />
        //     </Box>
        // </Wrapper>
    );
}

export default App;
