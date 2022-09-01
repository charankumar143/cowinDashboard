import './index.css'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

const CowinDashboard = () => (
  <>
    <div className="bg-container">
      <div className="top-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="image-icon"
        />
        <h1 className="main-heading">co-WIN</h1>
      </div>

      <h1 className="heading">coWIN Vaccination in India</h1>
      <div className="card-container">
        <h1 className="heading">Vaccination Coverage</h1>
        <VaccinationCoverage />
      </div>
      <div className="card-container">
        <h1 className="heading">Vaccination by age</h1>
        <VaccinationByAge />
      </div>
      <div className="card-container">
        <h1 className="heading">Vaccination by gender</h1>
        <VaccinationByGender />
      </div>
    </div>
  </>
)

export default CowinDashboard
