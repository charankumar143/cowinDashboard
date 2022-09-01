import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VaccinationByAge extends Component {
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
        vaccinatedData: data.vaccination_by_age,
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
    console.log(vaccinatedData)
    return (
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={vaccinatedData}
              startAngle={360}
              endAngle={0}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="18-44" fill="#a3df9f" />
              <Cell name="44-60" fill="#2d87bb" />
              <Cell name="Above 60" fill="#64c2a6" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
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

export default VaccinationByAge
