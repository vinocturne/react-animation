import styled from "styled-components";
import {
    motion,
    useMotionValue,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
    height: 200vh;
    width: 100vw;
    display: flex;
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

function App() {
    const x = useMotionValue(0);
    //useTransform은 3가지 인자를 받는데, 적용할 값, 본래 값, 변경할 값의 순으로 설정하면 된다.
    //첫 번째 배열에는 useMotionValue로 받아오는 값을 확인하고 애니메이션이 진행될 양 끝점을 확인해서 넣어도 된다.
    // 두번째 배열에서는 변경하고자하는 값인데, 아래에서는 scale 변경을 위해 0.1부터 2까지 하였으나, rotate라면 0부터 360까지도 가능.
    // const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
    const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
    // useEffect(() => {
    //     scale.onChange(() => console.log(scale.get()));
    // }, [x]);
    const gradient = useTransform(
        x,
        [-800, 800],
        [
            "linear-gradient(135deg,rgb(109, 199, 234),rgb(68, 108, 195))",
            "linear-gradient(135deg,rgb(60, 138, 75),rgb(176, 181, 82))",
        ]
    );
    const { scrollYProgress } = useViewportScroll();
    // useEffect(() => {
    //     scrollY.onChange(() => {
    //         console.log(scrollY.get(), scrollYProgress.get());
    //     });
    // }, [scrollYProgress, scrollY]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

    return (
        <Wrapper style={{ background: gradient }}>
            <Box
                style={{ x, rotateZ, scale: scale }}
                drag="x"
                dragSnapToOrigin
            ></Box>
        </Wrapper>
    );
}

export default App;
