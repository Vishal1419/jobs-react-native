import convertLatLongToZip from 'latlng-to-zip';
import queryString from 'qs';
import axios from 'axios';

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from '../constants/types';

const JOBS_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    v: '2',
    format: 'json',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = queryString.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOBS_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        const zip = await convertLatLongToZip(region);
        const url = buildJobsUrl(zip);
        const { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
    } catch (err) {
        console.log(err);
    }
};

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    };
};

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    };
};
