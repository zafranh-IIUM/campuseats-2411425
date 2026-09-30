// Code-along step 2: our first component.
// A component is a JavaScript function that returns JSX. Its name MUST start with a capital letter.
function Welcome() {
 const name = 'BICS 3301'
 const today = new Date().toLocaleDateString('en-MY', { weekday: 'long' })
 return (
 <div className="welcome">
 <h1>Hello, {name}!</h1>
 <p>Today is {today}. 2 + 3 = {2 + 3}</p>
 </div>
 )
}
export default Welcome