import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { BurgerBuilder } from './BurgerBuilder'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder
        onInitIngredients={() => { }} />
    )
  })

  it('has build controls when ingredients are present', () => {
    wrapper.setProps({ ings: { tomato: 1 } })
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })

  it('has a burger with given ingredients when ingredients are present', () => {
    const ings = { tomato: 1 }
    wrapper.setProps({ ings })
    expect(wrapper.contains(<Burger ingredients={ings} />)).toBeTruthy()
  })

  it('has a spinner when ingredietns are not present', () => {
    expect(wrapper.contains(<Spinner />)).toBeTruthy()
  })
})