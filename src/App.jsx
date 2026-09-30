import Welcome from './Welcome.jsx'
import CourseInfo from './CourseInfo.jsx'
// Code-along step 4: composition. App uses other components like HTML tags.
// Welcome is reused twice to show that components are reusable.
function App() {
 return (
 <>
 <Welcome />
 <CourseInfo />
 <Welcome />
 </>
 )
}
export default App