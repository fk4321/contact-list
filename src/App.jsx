import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [contact, setContact] = useState([])
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)
  console.log(hash)

  //fetch data and update contact array with the data 
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users")
      const data = await response.json()
      console.log(data)
      setContact(data)

    }
    fetchInfo()
  }, [])

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash.slice(1)*1)
    })
  }, [])

  // const mapContact = contact.map((item) => {
  //   return item.name
  // })

  const singleContact = contact.find((single) => {
    return hash === single.id
  })
  console.log(singleContact)

  return (
    <div className='mapClass' key={contact.id}>
      <h1>Number of Contacts ({contact.length})</h1>
      <ul className='list'>
        {
          contact.map((singleContact) => {
            return (
            <li className={hash === singleContact.id ? "selected" : null}>
            <a href={`#${singleContact.id}`}>
              {singleContact.name}
            </a>
            </li>
            )
          })
        }
      </ul>
      <h3>Person Details Below</h3>
      <div className='details'>
        <p> { singleContact ? ("Email: " + singleContact.email) : null}</p>
        <p> {singleContact ? ("Street: " + singleContact.address.street) : null}</p>
        <p> {singleContact ? ("Suite: " + singleContact.address.suite) : null}</p>
        <p> {singleContact ? ("City: " + singleContact.address.city) : null}</p>
        <p> {singleContact ? ("Company: " + singleContact.company.name) : null}</p>
        <p> {singleContact ? ("Phone: " + singleContact.phone) : null}</p>
      </div>
    </div>
  )
}

export default App
