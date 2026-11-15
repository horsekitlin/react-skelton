import { forwardRef } from 'react';
// third-party
import { LazyMotion, domAnimation, m, useCycle } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

const AnimateButtonContent = forwardRef(({ children, type = 'scale', direction = 'right', offset = 10, scale = { hover: 1, tap: 0.9 } }, ref) => {
    let offset1;
    let offset2;
    switch (direction) {
        case 'up':
        case 'left':
            offset1 = offset;
            offset2 = 0;
            break;
        case 'right':
        case 'down':
        default:
            offset1 = 0;
            offset2 = offset;
            break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
        case 'rotate':
            return (
                <m.div
                    ref={ref}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        repeatDelay: 0
                    }}
                >
                    {children}
                </m.div>
            );
        case 'slide':
            if (direction === 'up' || direction === 'down') {
                return (
                    <m.div
                        ref={ref}
                        animate={{ y: y !== undefined ? y : '' }}
                        onHoverEnd={() => cycleY()}
                        onHoverStart={() => cycleY()}
                    >
                        {children}
                    </m.div>
                );
            }
            return (
                <m.div ref={ref} animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
                    {children}
                </m.div>
            );

        case 'scale':
        default:
            if (typeof scale === 'number') {
                scale = {
                    hover: scale,
                    tap: scale
                };
            }
            return (
                <m.div ref={ref} whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
                    {children}
                </m.div>
            );
    }
});

const AnimateButton = forwardRef((props, ref) => (
    <LazyMotion features={domAnimation}>
        <AnimateButtonContent {...props} ref={ref} />
    </LazyMotion>
));

export default AnimateButton;
