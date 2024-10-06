import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Box, SxProps } from '@mui/system';
import { keyframes } from '@emotion/react';

interface AIIconProps {
    icon: string;
    sx?: SxProps;
    link?: string;
    width?: number;
    height?: number;
    glowing?: boolean;
    glowColor?: string;
}

const glowAnimation = (glowColor: string) => keyframes`
  0% {
    opacity: 0.5;
    box-shadow: 0 0 10px ${glowColor};
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 30px ${glowColor};
  }
  100% {
    opacity: 0.5;
    box-shadow: 0 0 10px ${glowColor};
  }
`;

export function AIIcon({
    icon,
    sx,
    link,
    width,
    height,
    glowing,
    glowColor = '#39FF14',
    ...other
}: AIIconProps) {
    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <Box
            component="span"
            sx={{
                cursor: link ? 'pointer' : 'default',
                display: 'inline-block',
                position: 'relative',
                '&::after': glowing
                    ? {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '50%',
                          animation: `${glowAnimation(glowColor)} 1.5s infinite ease-in-out`,
                      }
                    : {},
                ...sx,
            }}
            onClick={handleClick}
        >
            <Icon icon={icon} {...other} width={width} height={height} />
        </Box>
    );
}

AIIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    sx: PropTypes.object,
    link: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    glowing: PropTypes.bool,
    glowColor: PropTypes.string,
};
