import { connect } from "react-redux";
import '../css/Simulator.css'
import { facingAngle } from '../utils/constants';

function Bulldozer(props: any): JSX.Element  {
    const transform = {
        transform: `scaleX(${facingAngle[props.bulldozer.facing].scaleX}) scaleY(${facingAngle[props.bulldozer.facing].scaleY}) rotate(${facingAngle[props.bulldozer.facing].angle}deg)`
    };
    return (
        <div>
            <img style={transform} alt="bulldozer" width="50" src="https://image.flaticon.com/icons/png/512/46/46818.png" />
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        bulldozer: state.bulldozer
    };
  };
  
  export default connect(
    mapStateToProps
  )(Bulldozer);