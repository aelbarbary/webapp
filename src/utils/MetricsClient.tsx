import { API_ENDPOINTS } from '../dataServices/api'
import { AuthAxios } from '../dataServices/useAxios'
import axios from 'axios'

class MetricsClient {
    async emit_metrics(metricValue: any): Promise<void> {
        const token = await axios.post(import.meta.env.VITE_METRIC_API_URL + '/token/', {
            email: import.meta.env.VITE_METRIC_API_USERNAME,
            password: import.meta.env.VITE_METRIC_API_PASSWORD,
        })

        const response = await AuthAxios(token.data, API_ENDPOINTS.emitMetric, 'POST', metricValue)
    }
}

export default MetricsClient
