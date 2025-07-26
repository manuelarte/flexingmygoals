import re


class FootballFieldVars:
    field_width: int = 120
    field_height: int = 90
    field_grass_cut_height: int = 10
    extra_space: int = 3
    def __init__(self):
        self.field_width = 120
        self.field_height = 90
        self.field_grass_cut_height = 10
        self.extra_space = 3

def main():
    with open("football-field.svg.template") as f:
        print("Template file read")
        template: str = f.read()
        template_vars: FootballFieldVars = FootballFieldVars()
        for field in template_vars.__dict__:
            to_replace: str = f"{{{{ ${field} }}}}"
            to = getattr(template_vars, field)
            print(f"Replacing {to_replace}: {to}")
            template = template.replace(to_replace, str(to))

        eval_re = re.compile(r"{{ eval\((.*?)\) }}")
        for s in re.findall(eval_re, template):
            evaled = eval(s)
            print(f"Evaluating {s} = {evaled}")
            template = template.replace(f"{{{{ eval({s}) }}}}", str(evaled))
        with open("football-field-parsed.svg", "w") as text_file:
            text_file.write(template)
            print("SVG file created")

if __name__ == "__main__":
    main()
