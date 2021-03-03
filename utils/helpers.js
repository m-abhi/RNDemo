export const stateConditionString = state => {
    let navigateTo = '';
    if (state.isLoading) {
        navigateTo = 'LOAD_APP';
    }
    else if (state.isSignedIn && state.userToken && state.isSignedUp) {
        navigateTo = 'LOAD_HOME';
    }
    else if (!state.isSignedUp && state.noAccount) {
        navigateTo = 'LOAD_SIGNUP';
    }
    else if (!state.isSignedIn && !state.noAccount) {
        navigateTo = 'LOAD_SIGNIN';
    }
    return navigateTo;
};