import React, { useState } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

interface props {
    value: string
    handleYes: Function
    handleNo: Function
}

const DecisionSwitch = ({ value, handleYes, handleNo }: props) => {
    const [currentValue, setCurrentValue] = useState(value)

    const handleDecisionNo = () => {
        setCurrentValue('R')
        handleNo()
    }

    const handleDecisionYes = () => {
        setCurrentValue('A')
        handleYes()
    }

    return (
        <>
            <ToggleButtonGroup
                value={currentValue}
                exclusive
                aria-label="Match Decision"
                style={{
                    backgroundColor: 'white',
                }}
            >
                <ToggleButton
                    value="A"
                    style={
                        currentValue === 'A'
                            ? { backgroundColor: 'green', color: '#ffffff' }
                            : {}
                    }
                    onClick={handleDecisionYes}
                >
                    Yes
                </ToggleButton>
                <ToggleButton
                    value="R"
                    style={
                        currentValue === 'R'
                            ? { backgroundColor: '#ff3c65', color: '#ffffff' }
                            : {}
                    }
                    onClick={handleDecisionNo}
                >
                    No
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default DecisionSwitch
