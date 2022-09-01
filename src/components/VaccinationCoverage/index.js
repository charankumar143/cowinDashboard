import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const DataFormatter = number => {
  if (number > 1000) {
    return `${(number / 100).toString()}k`
  }
  return number.toString()
}

class VaccinationCoverage extends Component {
  state = {vaccinatedData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount = () => this.renderVaccination()

  renderVaccination = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        vaccinatedData: data.last_7_days_vaccination,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoading = () => <Loader type="ThreeDots" color="blue" />

  renderDetails = () => {
    const {vaccinatedData} = this.state

    return (
      <div>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={vaccinatedData} margin={{top: 5}}>
            <XAxis
              dataKey="vaccine_date"
              tick={{stroke: 'gray', strokeWidth: 1}}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{stroke: 'gray', strokeWidth: 0}}
            />
            <Legend wrapperStyle={{padding: 30}} />
            <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
            <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    const renderResult = this.renderResult()
    return <div>{renderResult}</div>
  }
}

export default VaccinationCoverage
