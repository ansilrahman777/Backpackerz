import PropTypes from 'prop-types';

function HeaderItems({ name, Icon }) {
  return (
    <div className='flex items-center gap-2 font-semibold cursor-pointer text-[14px] hover:underline underline-offset-8'>
      {Icon && <Icon />}
      <h2>{name}</h2>
      
    </div>
  );
}

HeaderItems.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired
};

export default HeaderItems;
