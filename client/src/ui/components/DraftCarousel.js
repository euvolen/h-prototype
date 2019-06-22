import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import DraftItem from './DraftItem';
import PropTypes from 'prop-types'

class DraftCarousel extends React.Component {
 
  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });
 
    setTimeout(() => {
      this.setState({
        children: this.createChildren(),
      })
    }, 100);
  }
 
  createChildren = () => this.props.drafts.map(draft => <DraftItem key={draft.id} {...draft}/>);
 
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
 
  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;
 
    return (
      <div className="container">
           
      <ItemsCarousel
        // Carousel configurations
        numberOfCards={3}
        gutter={12}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}
 
        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}
 
        chevronWidth={12}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        
        {children}
      
      </ItemsCarousel>
      </div>
    );  
  }
} 
DraftCarousel.propTypes = {
    drafts: PropTypes.array.isRequired
}
export default DraftCarousel