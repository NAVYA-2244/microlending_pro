import React from 'react'

const AboutUs = () => {
  return (
    <section className='about_section' id='About'>
        <div className='container'>
            <div className='row py-md-5'>
                <div className='col-xl-6 col-lg-6 text-lg-start text-center'>
                    <img src='assets/images/landing/aboutus/1.png'alt='img' className='about_image mb-4 mb-md-0'/>
                </div>
                <div className='col-xl-6 col-lg-6 my-auto'>
                    <h5 className='fw-bold aboutus-text mb-2 mb-md-4'>About us</h5>
                    <p className='fw-normal fs-15 mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus accusantium suscipit laboriosam adipisci voluptate repudiandae, fugit recusandae consequatur saepe tenetur, aspernatur voluptatum fugiat.</p>
                    <p className='fw-normal fs-15 mb-4'>sit amet consectetur adipisicing elit. Repudiandae suscipit modi, velit eveniet sint at aliquam quis quasi minus maxime! Tempora, id atque.</p>
                    <button className='btn btn-lg px-3 rounded-pill bg-primary-gradient text-white'>Get started</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUs
