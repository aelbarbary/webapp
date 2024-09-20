import React from 'react'
import States from './states.json'

export function getStates() {
    return States
}

export function getState(abbreviation: string): string {
    const state = States.find((s) => s.abbreviation === abbreviation)
    if (state) {
        return state.name
    } else {
        return ''
    }
}
