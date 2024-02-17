import logging
import colorlog
from logging.handlers import TimedRotatingFileHandler

def setup_logger(log_file):
    # Configurazione del logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)

    # Formattatore per i log colorati
    formatter = colorlog.ColoredFormatter(
        '%(log_color)s %(asctime)s - %(module)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        log_colors={
            'DEBUG': '\x1b[36m',  # Cyan
            'INFO': '\x1b[32m',   # Green
            'WARNING': '\x1b[33m',  # Yellow
            'ERROR': '\x1b[31m',  # Red
            'CRITICAL': '\x1b[41m\x1b[37m',  # White on Red
        }
    )

    # Gestore per i log su console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # Aggiungi il gestore al logger
    logger.addHandler(console_handler)

    try:
        # Gestore per i log su file con rotazione oraria
        file_handler = TimedRotatingFileHandler(log_file, when='H', interval=1, backupCount=0)
        file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logger.addHandler(file_handler)
    except Exception as e:
        logger.error(f"Errore nell'apertura del file di log: {e}", exc_info=True)

    # Imposta la configurazione di base del logger
    logging.basicConfig(filename=log_file, level=logging.DEBUG)

    return logger
