import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { startUpdateReservation } from '../actions/reservations';

export const Seats = (props) => {
  const [seats, setSeats] = useState([...Array(64)].fill(-1)); 
  const [activeSeats, setActiveSeats] = useState(0);
  const [admissionFee, setAdmissionFee] = useState(15);

  useEffect(() => {
    if (props.reservations && Object.keys(props.reservations).includes(props.match.params.id)) {
      const seatsObj = props.reservations[`${props.match.params.id}`];
      setSeats(seatsObj.seats);
    }
  }, [])

  useEffect(() => {
    setActiveSeats(seats.filter((seat) => seat === 1).length);
  }, [seats])

  const seatActive = (seat, index) => {
    if (seat === 0) return;
    const newSeats = [...seats];
    newSeats[index] *= -1;
    setSeats(newSeats);
  };

  const switchSeat = (seat) => {
    switch(seat){
      case -1: // default
        return "seat"
      case 0: // reserved seat
        return "seat reserved";
      case 1: // when clicked
        return "seat active"
      default:
        return "seat" // create error state?
    }
  }

  const onConfirm = () => {
    const reservedSeats = seats.map((seat) => {
      if (seat === 1) seat = 0;
      return seat;
    })
    props.startUpdateReservation(
      props.match.params.id,
      { 
        seats: reservedSeats,
        activeSeats,
        admissionFee 
      }
    );
    props.history.push('/');
  }

  const onCancel = () => {
    props.history.push(`/item/${props.match.params.id}`);
  }

  const seatWord = activeSeats === 1 ? 'Seat' : 'Seats';

  return (
    <section className="main-container">
      <Header history={props.history}/>
      <div className="seat-container">
        <div className="seat-wrapper">
          {seats.map((seat, index) => (
            <div
              className={switchSeat(seat)}
              onClick={() => seatActive(seat, index)}
              key={index}
            ></div>
          ))}
        </div>
        <div className="sum-text">
          <div>{activeSeats} {seatWord} : ${activeSeats * admissionFee}</div>
        </div>
        <div className="button-flex">
          <div className="button cancel" onClick={onCancel}>CANCEL</div>
          <div className="button confirm" onClick={onConfirm}>CONFIRM</div>
        </div>
      </div>
    </section>
  )
};

const mapStateToProps = (state, props) => ({
  movie: state.movies.filter((movie) => movie.id === props.match.params.id)[0],
  reservations: state.reservations
})

const mapDispatchToProps = (dispatch) => ({
  startUpdateReservation: (id, reservation) => dispatch(startUpdateReservation(id, reservation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seats);