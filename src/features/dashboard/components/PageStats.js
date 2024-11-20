import HeartIcon  from '@heroicons/react/24/outline/HeartIcon'
import BoltIcon  from '@heroicons/react/24/outline/BoltIcon'


function PageStats({}){
    return(
        <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <HeartIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Total Jobs</div>
    <div className="stat-value">25</div>
    <div className="stat-desc"></div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <BoltIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Ads Pending</div>
    <div className="stat-value">200</div>
    <div className="stat-desc">Need Admin Approval</div>
  </div>
</div>
    )
}

export default PageStats