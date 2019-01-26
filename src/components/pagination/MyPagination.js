import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class MyPagination extends Component {
  render() {
    return (
      <React.Fragment>
        <Pagination>
          <PaginationItem disabled={this.props.page === 1}>
            <PaginationLink previous href={`?page=${this.props.page - 1}`} />
          </PaginationItem>
          {[...Array(this.props.total_pages)].map((x, i) => (
            <PaginationItem key={i} className={(this.props.page === (i+1)) ? 'active' : ''}><PaginationLink href={'?page=' + (i + 1)}>{i + 1}</PaginationLink></PaginationItem>
          ))}
          <PaginationItem disabled={this.props.page === this.props.total_pages}>
            <PaginationLink next href={`?page=${this.props.page + 1}`} />
          </PaginationItem>
        </Pagination>
      </React.Fragment>
    )
  }
}

export default MyPagination;