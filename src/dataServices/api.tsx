const BASE_URL = import.meta.env.VITE_BACKEND_URL
const OFFERS_BASE_URL = `${import.meta.env.VITE_OFFER_BACKEND_URL}/offers/v1`
const EVENTS_BASE_URL = `${import.meta.env.VITE_EVENT_BACKEND_URL}/events/v1`
const MARRIAGE_BASE_URL = `${BASE_URL}/v1`
const METRIC_API_BASE_URL = import.meta.env.VITE_METRIC_API_URL

const API_ENDPOINTS = {
    // User
    registrationCode: (code: string) => `${MARRIAGE_BASE_URL}/code/${code}`,
    registerUser: `${MARRIAGE_BASE_URL}/register`,
    apiAuth: `${MARRIAGE_BASE_URL}/api-auth/`,
    googleRegister: `${MARRIAGE_BASE_URL}/register/google`,
    tokenObtainPair: `${MARRIAGE_BASE_URL}/token/`,
    tokenRefresh: `${MARRIAGE_BASE_URL}/token/refresh/`,
    changePassword: (pk: number) => `${MARRIAGE_BASE_URL}/user/${pk}/changepassword`,
    passwordReset: `${MARRIAGE_BASE_URL}/password/reset/`,
    passwordResetConfirm: `${MARRIAGE_BASE_URL}/password/reset/confirm/`,
    getEvent: (eventId: string) => `${MARRIAGE_BASE_URL}/user/event/${eventId}/`,
    registerForEvent: (eventId: string) => `${MARRIAGE_BASE_URL}/user/event/${eventId}/register/`,
    getMatcherProfile: (matcherUsername: string) => `${MARRIAGE_BASE_URL}/matcher/${matcherUsername}/profile`,
    editUser: (pk: number) => `${MARRIAGE_BASE_URL}/user/${pk}`,
    deleteUser: `${MARRIAGE_BASE_URL}/user/delete`,
    onboardingAccount: (userId: any) => `${MARRIAGE_BASE_URL}/user/stripe/account-onboarding/`,
    userInformation: (pk: number) => `${MARRIAGE_BASE_URL}/user/${pk}/information`,
    userSocialLinks: (pk: number) => `${MARRIAGE_BASE_URL}/user/${pk}/social`,
    userContacts: (pk: number) => `${MARRIAGE_BASE_URL}/user/${pk}/contact`,
    publicUserContacts: (pk: number) => `${MARRIAGE_BASE_URL}/public/user/${pk}/contact`,
    userList: `${MARRIAGE_BASE_URL}/users/`,
    matchMakingEventList: `${MARRIAGE_BASE_URL}/user/event/`,
    getFutureEvents: (matcherId: number) => `${MARRIAGE_BASE_URL}/user/matcher/${matcherId}/event/`,
    userEvents: (userId: number) => `${MARRIAGE_BASE_URL}/user/${userId}/event/`,
    matcherList: `${MARRIAGE_BASE_URL}/user/matchers/`,
    checkRegistration: (userId: number, eventId: string) => `${MARRIAGE_BASE_URL}/user/${userId}/event/${eventId}/check-registration/`,
    getUserRounds: (userId: number, eventId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/event/${eventId}/round/`,
    reportUser: (userId: any) => `${MARRIAGE_BASE_URL}/user/report/${userId}`,
    userFilters: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/filters`,
    activateEmail: (userId: any, code: any) => `${MARRIAGE_BASE_URL}/activate/${userId}/${code}`,
    getUser: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}`,
    getUserInformation: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/information`,
    getUserSocial: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/social`,
    getUserMatches: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/matches`,
    getMatch: (matchId: any) => `${MARRIAGE_BASE_URL}/match/${matchId}`,
    getDiscussionGroupCurrentMatches: (eventId: any) => `${MARRIAGE_BASE_URL}/user/event/${eventId}/discussion-group/current-matches/`,
    matchDiscussionGroup: (eventId: any) => `${MARRIAGE_BASE_URL}/user/event/${eventId}/discussion-group/match/`,
    approveDenyMatch: (matchId: any) => `${MARRIAGE_BASE_URL}/match/${matchId}`,
    expressInterest: (roundId: any) => `${MARRIAGE_BASE_URL}/user/round/${roundId}/match/`,
    applyCoupon: (eventId: any) => `${MARRIAGE_BASE_URL}/user/events/${eventId}/apply-coupon/`,

    //Online Events
    accessEvents: `${MARRIAGE_BASE_URL}/matcher/event/`,
    manageEvents: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}`,
    updateRound: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/update-round/`,
    getRoundView: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/round-view/`,

    // Matcher
    registerMatcher: `${MARRIAGE_BASE_URL}/register/matcher`,
    getUserProfile: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/profile`,
    match: `${MARRIAGE_BASE_URL}/match`,
    createRounds: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/round/create`,
    viewRounds: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/round/`,
    viewSummary: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/summary`,
    closeEvent: `${MARRIAGE_BASE_URL}/matcher/event/close/`,
    allUsersInSpecificEvent: (eventId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/users/`,
    updateRegistrationUserInSpecificEvent: (eventId: any, registrationId: any) => `${MARRIAGE_BASE_URL}/matcher/event/${eventId}/users/${registrationId}/`,
    getScreenByState: (state: any) => `${OFFERS_BASE_URL}/business/screens/${state}`,
    accessBusinessAd: `${OFFERS_BASE_URL}/business/ads`,
    createCheckout: `${OFFERS_BASE_URL}/stripe/create-orgs-checkout-session/`,
    getContact: (userId: any) => `${MARRIAGE_BASE_URL}/user/${userId}/contact`,
    getNewUsers: (selectedStatus: any) => `${MARRIAGE_BASE_URL}/matcher/users/${selectedStatus}`,
    getUsers: (gender: any) => `${MARRIAGE_BASE_URL}/matcher/users?gender=${gender}`,
    getUserRecommendations: (userId: any) => `${MARRIAGE_BASE_URL}/matcher/user/${userId}/recommendations`,
    getMatcherStats: `${MARRIAGE_BASE_URL}/matcher/statistics`,
    approveDenyUser: (userId: any) => `${MARRIAGE_BASE_URL}/matcher/user/${userId}`,
    getAllMatches: `${MARRIAGE_BASE_URL}/matcher/matches`,
    generateMatches: `${MARRIAGE_BASE_URL}/match/ai`,
    changeMatchStatus: (id: any) => `${MARRIAGE_BASE_URL}/matcher/match/${id}`,

    //Event
    accessEvent: `${EVENTS_BASE_URL}/event`,

    // System
    getNotifications: `${MARRIAGE_BASE_URL}/notifications`,
    createCheckOutSession: (eventId: any) => `${MARRIAGE_BASE_URL}/stripe/create-checkout-session/${eventId}`,
    emitMetric: `${METRIC_API_BASE_URL}/alert/v1/metric/emit`,
    health: 'health',
    getMatchMakers: `${MARRIAGE_BASE_URL}/matchmakers`,
}

export { BASE_URL, API_ENDPOINTS }
