import { css } from '@stitches/core';

export const BlogsSection = css({
  '& article': {
    margin: '15px',
  },
  '& article img': {
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },

  '& article h6, & article p': {
    overflowY: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    transition: 'all 0.3s ease 0s',
  },

  '& article h6:hover, & article p:hover': {
    height: '70.5px',
    display: 'flex',
    overflowY: 'scroll',
    boxShadow: '0px -6px 11px 0px rgba(0,0,0,0.08) inset',
  },

  '& article p:hover': {
    height: '49.1px',
  },

  '& article .card-body': {
    minHeight: '81.5px',
  },
});
