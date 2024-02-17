import logging
import colorlog

def setup_logger(log_file):
    # Configurazione del logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)

    # Formattatore per i log colorati
    formatter = colorlog.ColoredFormatter(
        '%(log_color)s%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        log_colors={
            'DEBUG': 'cyan',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'red,bg_white',
        }
    )

    # Gestore per i log su console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # Aggiungi il gestore al logger
    logger.addHandler(console_handler)

    try:
        # Gestore per i log su file
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logger.addHandler(file_handler)
    except Exception as e:
        logger.error(f"Errore nell'apertura del file di log: {e}", exc_info=True)

    # Imposta la configurazione di base del logger
    logging.basicConfig(filename=log_file, level=logging.DEBUG)

    return logger

