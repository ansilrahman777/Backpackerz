import PropTypes from 'prop-types';

function HeaderItems({ name, Icon }) {
  return (
    <div className='flex items-center gap-2 font-semibold cursor-pointer text-[18px] hover:underline underline-offset-8'>
      {Icon && <Icon />}
      <h2 className='hidden md:block'>{name}</h2>
      
    </div>
  );
}

HeaderItems.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired
};

export default HeaderItems;
