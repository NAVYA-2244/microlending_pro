import React from 'react';

const Home = () => {
  return (
    <section className='home_section' id='home'>
        <div className='container'>
            <div className='row'>
                <div className='col-xl-6 col-lg-6 my-auto'>
                    <div className='mt-md-5'>
                        <div className='highlight-line mb-4'></div>
                        <h1 className='main_home_text mb-4'>Get a home <br/> loan the <br/> smart Way with <span className='text-primary'>Micro !</span></h1>
                        <p className='mb-4 fw-normal'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta eligendi, quia laboriosam animi corporis sit dolores neque ab tempore iure voluptatum a fuga consectetur in quibusdam veniam id velit? Odio assumenda obcaecati quibusdam expedita iusto aut quas temporibus, atque quia cumque nisi ipsum animi minus!</p>
                        <button className="btn btn-primary btn-lg px-4 rounded-pill">Read More <i className="ri-arrow-right-line animate-pulse"></i></button>
                    </div>
                </div>
                <div className='col-xl-6 col-lg-6 text-sm-center'>
                    <img src="assets/images/landing/section1/7.png" alt='img' className='home_image mt-3 mt-md-0' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
