import { API_ENDPOINTS } from '../dataServices/api'
import { AuthAxios } from '../dataServices/useAxios'
import axios from 'axios'
import MetricsClient from './MetricsClient'

const metricsClient = new MetricsClient()

class EventOrganizer {
    async getToken() {
        try {
            const tokenResponse = await axios.post(`${import.meta.env.VITE_EVENT_BACKEND_URL}/token/`, {
                email: import.meta.env.VITE_EVENT_ORGANIZER_EMAIL,
                password: import.meta.env.VITE_EVENT_ORGANIZER_PASSWORD,
            })

            return tokenResponse.data
        } catch (error) {
            metricsClient.emit_metrics({
                metric: 'Marriage.Get_Event_Organizer_token.Failure',
                value: 1,
            })
        }
    }

    async createEvent(data: any) {
        try {
            const token = await this.getToken()
            const response = await AuthAxios(token, API_ENDPOINTS.accessEvent, 'POST', data, 'multipart/form-data')
        } catch (error) {
            metricsClient.emit_metrics({
                metric: 'Marriage.Create_Shared_Event.Failure',
                value: 1,
            })
        }
    }
}

export default EventOrganizer
