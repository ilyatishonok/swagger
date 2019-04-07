import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

export interface IFilterProps {
    filters: {
        startDate: Date | null;
        endDate: Date | null;
    };
    setStartDate: (startDate: Date | null) => void;
    setEndDate: (endDate: Date | null) => void;
}

const FilterArea = styled.div`
    position: sticky;
    top: 4.7rem;
    display: flex;
    background: #eaeaea;
    height: 2rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

const Filter = (props: IFilterProps) => (
    <FilterArea>
        Date from: 
            <DatePicker
                selected={props.filters.startDate}
                onChange={(date) => props.setStartDate(date)}
                dateFormat="MM/dd/yyyy"
            />
        Date to:
            <DatePicker
                selected={props.filters.endDate}
                onChange={(date) => props.setEndDate(date)}
                dateFormat="MM/dd/yyyy"
            />
    </FilterArea>
);

export default Filter;