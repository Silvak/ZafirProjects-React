function useFormatText(inputValue) {
  // Dividir la cadena de entrada en palabras
  const words = inputValue?.toLowerCase().split(' ');

  const capitalizedWords = words?.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords?.join(' ');
}

export default useFormatText;
