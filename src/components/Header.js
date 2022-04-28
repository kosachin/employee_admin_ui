import { Tabled } from "./Table";

export const Header = () => {
  return (
    <div>
      <h1>Welcome to Employee Page</h1>
      <Tabled />
    </div>
  );
};


// import { connect } from "react-redux";
// import { compose, lifecycle } from "recompose";
// import { fetchEmployeeDataSuccess } from "../context/actions";
// import { Tabled } from "./Table";
// import employees from "../utils/tempData";

// export const Header = ({ store }) => {
//   console.log(store);
//   return (
//     <div>
//       <h1>Welcome to Employee Page</h1>
//       <Tabled />
//     </div>
//   );
// };

// const enhance = compose(
//   connect(
//     (store) => ({
//       data: store.data,
//     }),
//     (dispatch) => ({
//       handleFetch: () => dispatch(fetchEmployeeDataSuccess(employees)),
//     })
//   ),
//   lifecycle({
//     componentDidMount() {
//       this.props.handleFetch();
//     },
//   })
// );

// export default enhance(Header);
