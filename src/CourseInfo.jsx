// Code-along step 3: a second component that uses className, an array and a self-closing tag.
function CourseInfo() {
 const phases = ['React', 'Firebase', 'PWA', 'Capstone']
 return (
 <section className="course-info">
 <h2>What we will cover</h2>
 <p>{phases.join(' → ')}</p>
 <img src="/favicon.svg" alt="Vite logo" width="48" />
 </section>
 )
}
export default CourseInfo
