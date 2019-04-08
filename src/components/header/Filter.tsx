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

const FiltersArea = styled.div`
    position: sticky;
    top: 4.7rem;
    display: flex;
    padding: 0.5rem;
    background: #eaeaea;
    min-height: 2rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

const FilterArea = styled.div`
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    
    @media (max-width: 500px) {
        margin-right: 0;
        margin-left: 0;
        margin-top: 0.5rem;
    }
`;

const FilterDatePicker = styled(DatePicker)`
    padding: 0.3rem;
    border-radius: 0.5rem;
    outline: none;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`;

const Filter = (props: IFilterProps) => (
    <FiltersArea>
        <FilterArea>
            <b>Date from:</b>
                <FilterDatePicker
                    selected={props.filters.startDate}
                    onChange={(date) => props.setStartDate(date)}
                    dateFormat="MM/dd/yyyy"
                />
        </FilterArea>
        <FilterArea>
            <b>Date to:</b>
                <FilterDatePicker
                    selected={props.filters.endDate}
                    onChange={(date) => props.setEndDate(date)}
                    dateFormat="MM/dd/yyyy"
                />
        </FilterArea>
    </FiltersArea>
);

export default Filter;
