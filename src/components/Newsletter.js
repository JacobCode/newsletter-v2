import React, { useEffect, useReducer, useRef } from 'react';
import { selectStep, updateStep} from '../redux/features/siteManager';
import { useSelector, useDispatch } from 'react-redux';
import { Power3, TweenMax } from 'gsap';

// Atoms
import Title from './atoms/Title';
import Subtitle from './atoms/Subtitle';
import Button from './atoms/Button';

const Newsletter =  () => {
  const dispatch = useDispatch();
  let currentStep = useSelector(selectStep).step;
  let newsletter = useRef(null);
  const [userInput, setUserInput] = useReducer(
		(state, newState) => ({
			...state,
			...newState
		}), {
			email: '',
			checkbox: false,
			firstName: '',
			lastName: '',
		}
  );
  const { email, checkbox, firstName, lastName } = userInput;
  const stepData = [
    {
      title: 'join the list',
      subtitle: 'SIGN UP FOR THE IN-Dex NEWSLETTER.'
    },
    {
      title: 'join the list',
      subtitle: 'ALMOST DONE! PLEASE ENTER YOUR FIRST AND LAST NAME.'
    },
    {
      title: 'congratulations!',
      subtitle: 'Thank You For Signing Up!'
    }
  ]
  const showNextStep = () => {
    dispatch(updateStep(currentStep + 1));
  }
  const encode = (data) => {
		return Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');
	};
  const handleSubmit = (e) => {
    e.preventDefault();
    TweenMax.to(newsletter, 0.6, {
			opacity: 0,
			onComplete: showNextStep,
			ease: Power3.easeInOut
		});
    if (email && firstName && lastName) {
      const data = { email, firstName, lastName }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "newsletter", ...data })
      })
      .then(() => console.log("Success"))
      .catch(error => console.error(error));
    }
  }
  const handleChange = (e) => {
		let name = e.target.name;
		let newValue = e.target.value;
		if (name === 'checkbox') {
			setUserInput({ 'checkbox': !checkbox });
		} else {
			setUserInput({ [name]: newValue });
		}
  }
  useEffect(() => {
    TweenMax.to(newsletter, 0.6, {
      opacity: 1,
      ease: Power3.easeInOut
    })
  }, [currentStep])
  return (
    <div className="newsletter" ref={el => newsletter = el}>
      <Title content={stepData[currentStep].title} />
      <div className={`form-container step-${currentStep}`}>
        <input type="hidden" name="newsletter" value="signup" />
        <Subtitle content={stepData[currentStep].subtitle} />
        <form onSubmit={handleSubmit} data-netlify-recaptcha="true" data-netlify="true" netlify="true" name="newsletter">
            {currentStep === 0 && (
              <div className="tab">
                <div className="form-group">
                  <input onChange={handleChange} type="email" placeholder="Email" name="email" required />
                  <Button color="primary" type="submit">NEXT</Button>
                </div>
                <div className="form-group">
                  <input onChange={handleChange} id="checkbox" type="checkbox" name="checkbox" required />
                  <label htmlFor="checkbox">
                    I agree to receive information from Interactive Nerd in accordance with the following <span>Privacy Policy</span>.
                  </label>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="tab">
                <div className="form-group">
                  <input onChange={handleChange} value={firstName} placeholder="First Name" name="firstName" type="text" required />
                  <input onChange={handleChange} value={lastName} placeholder="Last Name" name="lastName" type="text" required />
                  <Button color="primary" type="submit">SIGN UP</Button>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="tab">
                <p> Look out for the latest news on your favorite shows.</p>
              </div>
            )}
        </form>
      </div>
    </div>
  )
}

export default Newsletter;