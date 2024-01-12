import 'package:flutter/material.dart';

class BlinkingText extends StatefulWidget {
  final String text;
  final EdgeInsetsGeometry padding;
  const BlinkingText({required this.text, required this.padding});

  @override
  _BlinkingTextState createState() => _BlinkingTextState();
}

class _BlinkingTextState extends State<BlinkingText>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    )..repeat(reverse: true);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Padding(
          padding: widget.padding,
          child: Text(
            widget.text,
            style: TextStyle(
              fontSize: 17,
              color: HSLColor.fromAHSL(
                1.0,
                (_controller.value * 360.0).toInt().toDouble(),
                1.0,
                0.5,
              ).toColor(),
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
